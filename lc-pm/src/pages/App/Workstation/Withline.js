import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Coord,
  Tooltip
} from "bizcharts";
import DataSet from "@antv/data-set";

class Withline extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      {
        item: "Design",
        v: 70,
      },
      {
        item: "Development",
        v: 60,
      },
      {
        item: "Marketing",
        v: 50,
      },
      {
        item: "Users",
        v: 40,
      },
      {
        item: "Test",
        v: 60,
      },
      {
        item: "Language",
        v: 70,
      },
      {
        item: "Technology",
        v: 50,
      },
      {
        item: "Support",
        v: 30,
      },
      {
        item: "Sales",
        v: 60,
      },
      {
        item: "UX",
        v: 50,
      }
    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: "fold",
      fields: ["v"],
      // 展开字段集
      key: "user",
      // key字段
      value: "score" // value字段
    });
    const cols = {
      score: {
        min: 0,
        max: 80
      }
    };
    console.log(window.innerHeight);
    return (
      <div>
        <Chart
          height={window.innerHeight/3}
          data={dv}
          padding={[0, 0, 0, 0]}
          scale={cols}
          forceFit
        >
          <Coord type="polar" radius={0.8} />
          <Axis
            name="item"
            line={null}
            tickLine={null}
            grid={{
              lineStyle: {
                lineDash: null
              },
              hideFirstLine: false
            }}
          />
          <Tooltip />
          <Axis
            name="score"
            line={null}
            tickLine={null}
            grid={{
              type: "polygon",
              lineStyle: {
                lineDash: null
              },
              alternateColor: "rgba(0, 0, 0, 0.04)"
            }}
          />
          <Geom type="line" position="item*score" color="user" size={2} />
          <Geom
            type="point"
            position="item*score"
            color="user"
            shape="circle"
            size={4}
            style={{
              stroke: "#fff",
              lineWidth: 1,
              fillOpacity: 1
            }}
          />
        </Chart>
      </div>
    );
  }
}

export default Withline;
