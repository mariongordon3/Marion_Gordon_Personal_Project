import { useOutletContext } from "react-router-dom"
import { useState,useEffect } from "react"
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function HomePage(){
  const{plateList,journalList,foodAmount,user} = useOutletContext()
  let carbCount = 0
  let proteinCount = 0
  let fatCount = 0
  let calories = 0
  plateList.map((plate)=>{
    plate.ingredients.map((ingredient)=>{
      ingredient.nutrients_id.map((nutrient)=>{
        let microNutrients = []
        let macroNutrients=[]
        if (nutrient.is_macro===true){
          macroNutrients.push(nutrient)
        }
        else{
          microNutrients.push(nutrient)
        }
        macroNutrients.map((macro)=>{
          if (macro["name"] == "Carbohydrate, by difference"){
           carbCount += (macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])
          }
          if (macro["name"] == "Protein"){
            proteinCount += (macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])
          }
          if (macro["name"] == "Total lipid (fat)"){
            fatCount += (macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])
          }
        })
      })
    })
  })
  const data = [
    { name: 'Carbohydrates', value: carbCount },
    { name: 'Protein', value: proteinCount },
    { name: 'Fat', value: fatCount },
  ];
  
    // const foodPick = foodData?.find((x)=> e.target.value == x.fdcId)
    return (
      <div>
        <h1>TODAY'S NUMBERS</h1>
        <h2>welcome {user}</h2>
          <h2 className="chartHeader">macros</h2>
        <div className="piechart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
