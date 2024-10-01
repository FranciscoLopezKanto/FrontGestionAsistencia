// index.js o App.js
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/apollo';
import App from './App'; // Tu componente principal

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
} else {
  console.error('Root container not found');
}
