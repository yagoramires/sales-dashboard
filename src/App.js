import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // mapeia a autenticacao do usuario
// Hooks
import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
// Contexts
import { AuthProvider } from './context/AuthContext';
import { FormatProvider } from './context/formatContext';
// Components
import Home from './pages/Home/Home';
// Pages
import Header from './components/Header/Header';
import NotFound from './pages/PageNotFound/NotFound';
import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// Industry Pages
import Industries from './pages/Industries/Industries';
import RegisterIndustry from './pages/Industries/Create/RegisterIndustry';
import Industry from './pages/Industries/Details/Industry';
import EditIndustry from './pages/Industries/Edit/EditIndustry';
// Products Pages
import Products from './pages/Products/Products';
import RegisterProduct from './pages/Products/Create/RegisterProduct';
import Product from './pages/Products/Product/Product';
import EditProduct from './pages/Products/Edit/EditProduct';
// Clients Pages
import Clients from './pages/Clients/Clients';
import RegisterClient from './pages/Clients/Create/RegisterClient';
import Client from './pages/Clients/Details/Client';
import EditClient from './pages/Clients/Edit/EditClient';

// import RegisterOrder from './pages/Orders/RegisterOrder/RegisterOrder';

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuth();

  const loadingUser = user === undefined; //se o usuario for undefined, significa que estará carregando algo

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // é passado o valor de autenticacao (auth), e uma funcao que retorna um user diferente de undefined
      setUser(user);
    });
  }, [auth]); // quando atualizar o auth executa a funcao

  if (loadingUser) {
    return (
      <section>
        <p> Carregando ...</p>
      </section>
    );
  } // caso o user seja undefined irá retornar o paragrafo carregando

  return (
    <div className='App'>
      <AuthProvider value={{ user }}>
        <FormatProvider>
          <Header />
          <Routes>
            {/* Login Page */}
            <Route
              path='/login'
              element={user ? <Navigate to='/' /> : <Login />}
            />
            {/* <Route
              path='/register/user'
              element={user ? <Navigate to='/' /> : <Register />}
            /> */}
            {/* Pages */}
            <Route
              path='/'
              element={!user ? <Navigate to='/login' /> : <Home />}
            />
            <Route
              path='/orders'
              element={!user ? <Navigate to='/login' /> : <Industries />}
            />
            <Route
              path='/products'
              element={!user ? <Navigate to='/login' /> : <Products />}
            />
            <Route
              path='/clients'
              element={!user ? <Navigate to='/login' /> : <Clients />}
            />
            <Route
              path='/industries'
              element={!user ? <Navigate to='/login' /> : <Industries />}
            />

            {/* Individual Pages */}

            <Route
              path='/industries/:id'
              element={!user ? <Navigate to='/login' /> : <Industry />}
            />

            <Route
              path='/products/:id'
              element={!user ? <Navigate to='/login' /> : <Product />}
            />

            <Route
              path='/clients/:id'
              element={!user ? <Navigate to='/login' /> : <Client />}
            />

            {/* Edit Pages */}

            <Route
              path='/industries/edit/:id'
              element={!user ? <Navigate to='/login' /> : <EditIndustry />}
            />

            <Route
              path='/products/edit/:id'
              element={!user ? <Navigate to='/login' /> : <EditProduct />}
            />

            <Route
              path='/clients/edit/:id'
              element={!user ? <Navigate to='/login' /> : <EditClient />}
            />

            {/* Register Pages */}

            {/* <Route
              path='/orders/new'
              element={!user ? <Navigate to='/login' /> : <RegisterOrder />}
            /> */}
            <Route
              path='/products/new'
              element={!user ? <Navigate to='/login' /> : <RegisterProduct />}
            />
            <Route
              path='/clients/new'
              element={!user ? <Navigate to='/login' /> : <RegisterClient />}
            />
            <Route
              path='/industries/new'
              element={!user ? <Navigate to='/login' /> : <RegisterIndustry />}
            />
            {/* <Route
            path='/profile'
            element={user ? <Navigate to='/' /> : <Profile />}
          /> */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </FormatProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
