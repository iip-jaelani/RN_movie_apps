import React from 'react';
import Axios from 'axios';

export const client = Axios.create({
  baseURL: 'https://api.deezer.com/',
});

export const client_movie = Axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});
