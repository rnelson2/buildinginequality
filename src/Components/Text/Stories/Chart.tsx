import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from '../../Chart/Index'; 
import * as Types from '../../../index.d';


const Chart = ({ city, omitHeader }: { city: 'Chicago' | 'New York'; omitHeader?: boolean  }) => {
  const [data, setData] = useState<Types.Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const chicagoBins = ['822667fffffffff', '82275ffffffffff', '82274ffffffffff']
  const newYorkBins = ['822aaffffffffff', '822a17fffffffff'];
  useEffect(() => {
    const hexFiles = city === 'Chicago' ? chicagoBins : newYorkBins; // Add New York bins if available
    
    const fetches = hexFiles.map((hex) => {
      // already loaded?
      // kick off fetch
      const req = axios
        .get<{ type: "FeatureCollection"; features: Types.Feature[] }>(
          `/points/${hex}.geojson` // Adjust the path as necessary
        )
        .then((res) => {
          const feats = res.data.features;
          return feats;
        })
        // @ts-ignore
        .catch((err) => {
          console.error(`Failed to load hex ${hex}:`, err);
          return [];
        });

      return req;
    });

    // 4. Wait for _all_ the needed bins, then aggregate & filter
    Promise.all(fetches)
      .then((arraysOfFeatures) => {
        const all = arraysOfFeatures.flat();

        setData(
          all
            .filter(
            (property) =>
              property.properties.mortgages.length > 0 &&
                property.properties.mortgages[0].proj_num &&
                property.properties.property_city &&
                (property.properties.property_city.toLowerCase() === 'chicago' || property.properties.property_city.toLowerCase().startsWith('new york'))
          )
        );
      })
      .finally(() => {
        setLoading(false);``
      });
  }, [city]);

  if (loading) {
    return null;
  }

  return (
      <div>
        <ChartComponent properties={data} omitHeader={!!omitHeader} />
      </div>
  );
};

export default Chart;