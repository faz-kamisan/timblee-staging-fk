import React from 'react';
import ReactOnRails from 'react-on-rails';
import SiteMap from '../components/SiteMap';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext
const SiteMapApp = (props, _railsContext) => {
  const reactComponent = (
    <div>
      <p>Rendering From React</p>
      <SiteMap />
    </div>
  );
  return reactComponent;
};

// This is how react_on_rails can see the SiteMap in the browser.
ReactOnRails.register({ SiteMapApp });
