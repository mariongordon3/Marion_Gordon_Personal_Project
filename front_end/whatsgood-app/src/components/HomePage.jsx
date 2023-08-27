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
  const{plateList,journalList,foodAmount,user,setClick,click} = useOutletContext()
  console.log(plateList)
  let carbCount = 0
  let proteinCount = 0
  let fatCount = 0
  let carbGram = 0
  let proteinGram = 0
  let fatGram = 0
  let calories = 0
  let microData =[]
  plateList.map((plate)=>{
    plate.ingredients.map((ingredient)=>{
      ingredient.nutrients_id.map((nutrient)=>{
        let microNutrients = []
        let macroNutrients=[]
        let microNutrientData = {}
        if (nutrient.is_macro===true){
          macroNutrients.push(nutrient)
        }
        else{
          microNutrients.push(nutrient)
        }
        macroNutrients.map((macro)=>{
          if (macro["name"] == "Carbohydrate, by difference"){
           carbCount += ((macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])*4)
           carbGram += (macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])
          }
          if (macro["name"] == "Protein"){
            proteinCount += ((macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])*4)
            proteinGram += (macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])
          }
          if (macro["name"] == "Total lipid (fat)"){
            fatCount += ((macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])*9)
            fatGram += (macro["nutrients_id"]["amount"] *ingredient["amount_consumed"])
          }
        })
        microNutrients.map((micro)=>{
          let microName = micro["name"]
          let microPercent= micro["percentDailyValue"]
          if (microName == "Energy"){
            calories += (micro["nutrients_id"]["amount"] *ingredient["amount_consumed"])
          }
          if (microName !== null && microName !== "Energy"&& micro["name"] !== "Sugars, added" && microName !== "Sugars, total including NLEA" && microName !== "Cholesterol" && microName !== "Fatty acids, total saturated"&& microName !== "Fatty acids, total trans" ){
            if (microData.hasOwnProperty(microName)){
              microData[microName] +=(microPercent*ingredient["amount_consumed"])
            }
            else{
              microData[microName] = (microPercent*ingredient["amount_consumed"])
            }
          }
        })
      })
    })
  })
  console.log(microData)
  const data = [
    { name: `${carbGram} grams carbohydrates in kcal`, value: carbCount, },
    { name: `${proteinGram} grams protein in kcal`, value: proteinCount },
    { name: `${fatGram} grams fat in kcal`, value: fatCount },
  ];

  
    return (
      <>
      <h2>welcome {user}</h2>
        <div className="home">
          <div className="homePage-title">
            <h1 >What'sGood</h1>
          </div>
          <div className = 'homePage-numbers'>
              <div className="homePage-macro">
                  <h2 className="chartHeaderMacro">Macros</h2>
                  <div>
                  Total Calories:{calories}
                  </div>
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
              <div className='homePage-Micro'>
                  <h2 className="chartHeaderMicro">Micros</h2>
                  <div className="dailyIntake">
                            <div className="homePage-img">
                              <h3>Do better</h3>
                              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0dbb6995-1dd8-4d51-8a08-e890a1051a2f/d29g8zy-29cc8df3-2efe-419d-89ea-245213b83a4b.jpg/v1/fill/w_524,h_536,q_75,strp/super_buu_thumbs_down_by_malinakitten_d29g8zy-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTM2IiwicGF0aCI6IlwvZlwvMGRiYjY5OTUtMWRkOC00ZDUxLThhMDgtZTg5MGExMDUxYTJmXC9kMjlnOHp5LTI5Y2M4ZGYzLTJlZmUtNDE5ZC04OWVhLTI0NTIxM2I4M2E0Yi5qcGciLCJ3aWR0aCI6Ijw9NTI0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.T_gqCPBNTpcua0r3IVoyaW2AkdCbhSwEAJoTS_1Yk9I" alt="thumbs down" />
                            </div>
                    <ul>
                      {Object.entries(microData).map(([key, value]) => (
                        <li key={key}>{key} : {value}%</li>
                      ))}
                    </ul>
                  </div>
                </div>







          </div>
        </div>
      </>
    );
  }
