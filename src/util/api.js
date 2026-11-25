import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';
import axios from 'axios';


const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': API_KEY    
  }
});

export function getProductId(_links) {
    const url = _links.self.href;        
    const id = url.replace(API_URL+"/product/", "");    
    return id;
}

export function getProduct(id) {
  const response = apiClient.get("/product/"+id);  
  return response;
}

export function getMainProducts() {
  const response = apiClient.get("/product");  
  return response;
}
