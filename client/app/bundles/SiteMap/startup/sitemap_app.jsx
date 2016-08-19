import React from 'react';
import ReactOnRails from 'react-on-rails';
import Sitemap from '../components/sitemap';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
// railsContext provides contextual information especially useful for server rendering, such as
// knowing the locale. See the React on Rails documentation for more info on the railsContext
const SitemapApp = (props, _railsContext) => {
  const reactComponent = (
    <div>
      <p>Rendering From React</p>
      <Sitemap sitemapProps={props}/>
    </div>
  );
  return reactComponent;
};

// This is how react_on_rails can see the Sitemap in the browser.
ReactOnRails.register({ SitemapApp });
