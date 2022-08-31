import './App.css';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from "https://cdn.skypack.dev/topojson@3.0.2"; 
import Chart from './Chart';

function App() {
  const [countyData, setCountyData] = useState([])
  const [educationData, setEducationData] = useState([])
  const width = 1000
  const height = 650
  const educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'
  const countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'

  useEffect(()=>{
    d3.json(countyURL)
      .then((data, error) => {
        if(error){
          console.log(error)
        } else {
          setCountyData(topojson.feature(data, data.objects.counties).features)

          d3.json(educationURL)
            .then((data, error) => {
              if(error){
                console.log(error)
              } else {
                setEducationData(data)
              }
            })
        }
      })
  },[])

  return (
    <div className="main--container">
      <h1 id='title'>United States Educational Attainment</h1>
      <p id='description'>Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</p>
      <div id='tooltip'>
        
      </div>
      <Chart
        width={width}
        height={height}
        countyData={countyData}
        educationData={educationData}
      />
      <svg id='legend'></svg>
    </div>
  );
}

export default App;
