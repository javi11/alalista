import { NavigationActions } from 'react-navigation';

export default (withNullKey, routeName) => {
  const options = {
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  };
  if (withNullKey) {
    options.key = null;
  }
  return NavigationActions.reset(options);
};
