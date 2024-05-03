import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';

import Carousel from './Carousel';


const Home = () => {
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState([]);

  const loadProductsByArrival = () => {
    getProducts('createdAt').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  const images = [
    'https://images.ctfassets.net/1aemqu6a6t65/2ntmKf8TCLTr63mFczO6PH/55f70142fafa360533f82dfa229d9f06/Views-Roosevelt-Island-Manhattan-NYC-Photo-Julienne-Schaer.jpg',
    'https://images.ctfassets.net/1aemqu6a6t65/jAFBo5XFPQtKd9CWIU9IZ/c1aa67e4e82ec025d35ca2abecff84e6/Tramway-4-Roosevelt-Island-Manhattan-NYC-Photo-Brittany-Petronella.jpg',
    'https://cdn.vox-cdn.com/thumbor/7RNJMnm7lsPXDOE9fm33Ug9sork=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/10838519/170423_12_46_06_5DS_8750.jpg',
    'https://assets.simpleviewinc.com/simpleview/image/upload/q_75/v1/crm/newyorkstate/roosevelt-island-_promenade_and_cherry_blossoms-rioc_e5f34b2f-0062-7c4a-ad15ed39221b606d.jpg',
    'https://images.ctfassets.net/1aemqu6a6t65/48yalVZR6f0zCbwDFLSDYU/2221c37b8e13052e2019ea8ea7bd1b97/Roosevelt-Island-6-Manhattan-NYC-Photo-Brittany-Petronella.jpg'
  ];

  useEffect(() => {
    loadProductsByArrival();
  }, []);

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-1'></div>

        <div className='col-md-10'>
          <Carousel images={images} />
          <div className='row'>
            {productsByArrival.map((product, i) => (
              <div key={i} className='col-xl-4 col-lg-4 col-md-4 col-sm-6'>
                <Card product={product} />
              </div>
            ))}
          </div>
        </div>

        <div className='col-md-1'></div>
      </div>
    </Layout>
  );
};

export default Home;
