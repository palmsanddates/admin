import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import EventList from './containers/EventList';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import { useAppContext } from './lib/contextLib';

export default function RoutesApp() {
  const { isAuthenticated } = useAppContext();
  return (
    <Routes>
      <Route
        index
        path="/"
        element={isAuthenticated ? <EventList /> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      ></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
