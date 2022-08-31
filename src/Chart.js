import './Chart.css';
import { useEffect, useState } from 'react';
import * as d3 from 'd3';

const Chart = ({countyData, educationData, width, height}) => {
    useEffect(()=> {
        drawMap();
        drawKey();
    }, [educationData])

    const data = ['0' ,'5', '15', '25', '35', '45', '55']
    const tooltip = d3.select('#tooltip')
                .style('visibility', 'hidden')
    let svgContainer = d3.select('#svgContainer');
    let svgKey = d3.select('#legend')

    const drawMap = () => {
        svgContainer.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class', 'county')
            .attr('fill', (countyDataItem) => {
                let id = countyDataItem.id
                let county = educationData.find((item) => {
                    return item.fips === id
                })
                let percentage = county.bachelorsOrHigher;
                if(percentage <= 5){
                    return '#b2ecfb'
                } else if (percentage <= 15){
                    return '#98d5e4'
                } else if (percentage <= 25) {
                    return '#7ebecd'
                } else if (percentage <= 35) {
                    return '#65a7b7'
                } else if(percentage <= 45) {
                    return '#4a91a2'
                } else if (percentage <= 55) {
                    return '#2e7c8d'
                } else if (percentage <= 65){
                    return '#006778'
                }
            })
            .attr('data-fips', item => item.id)
            .attr('data-education', (countyDataItem) => {
                let id = countyDataItem.id
                let county = educationData.find((item) => {
                    return item.fips === id
                })
                let percentage = county.bachelorsOrHigher
                return percentage
            })
            .on('mouseover', (e, countyDataItem) => {
                let id = countyDataItem.id
                let county = educationData.find((item) => {
                    return item.fips === id
                })
                let areaName = county.area_name;
                let state = county.state;
                let percentage = county.bachelorsOrHigher;
                tooltip
                    .style('visibility', 'visible')
                    .html(`${areaName}, ${state}: ${percentage}%`)
                    .style('left',(e.pageX + 10) + 'px')
                    .style('top', (e.pageY + 10) + 'px')
                    .attr('data-education', `${percentage}`)
            })
            .on('mouseout', ()=>{
                tooltip.style('visibility', 'hidden')
            })
    }

    const drawKey = () => {
        const height = 10;
        const width = 50;
        const rect = svgKey.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('x', (d, i) => i * width)
                .attr('fill', item => {
                    if(item <= 0){
                        return '#b2ecfb'
                    } else if (item <= 5){
                        return '#98d5e4'
                    } else if (item <= 15) {
                        return '#7ebecd'
                    } else if (item <= 25) {
                        return '#65a7b7'
                    } else if(item <= 35) {
                        return '#4a91a2'
                    } else if (item <= 45) {
                        return '#2e7c8d'
                    } else if(item <= 55) {
                        return '#006778'
                    }
                })
        
        const text = svgKey.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'text--key')
                .attr('x', (d, i) => i * width)
                .attr('y', (d, i) => height +  15)
                .text((d, i ) => d + '%')     
    }
 
    return(
        <svg id='svgContainer' width={width} height={height}></svg>
    )
}

export default Chart;