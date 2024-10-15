import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  async function openCatStoryEditor() {
    const catApiUrl = 'https://dog.ceo/api/breeds/image/random';
    try {
      const response = await (await fetch(catApiUrl)).json();
      const catImage = response.message;
      console.log(catImage);
      console.log("ggggggggggggggggggggggggggggggggg");

      bridge.send('VKWebAppShowStoryBox', {
        background_type: 'image',
        url: catImage,
      })
      .then((result) => {
        if (result.result) {
          console.log("Редактор историй открыт:", result);
        }
      })
      .catch((error) => {
        console.error("Ошибка при открытии редактора:", error);
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
          <Button size="l" stretched onClick={openCatStoryEditor}>
            Редактор историй с шабаками
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
