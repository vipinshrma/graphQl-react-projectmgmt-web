import './App.css';
import Header from './components/Header';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Clients from './components/Clients';
import Projects from './components/Projects';
import { Route, Routes } from 'react-router-dom';
import ProjectDetails from './components/Projects/ProjectDetails';
import NotFound from './components/NotFound';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Header />

      <Routes>
        <Route path='/' element={<>
          <Projects />
          <Clients />
        </>} />
        <Route path='/projects/:id' element={<ProjectDetails />} />
        <Route path='*'  element={<NotFound/>}/>
      </Routes>
    </ApolloProvider>

  );
}

export default App;
