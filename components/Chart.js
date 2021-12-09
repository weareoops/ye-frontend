import {PureComponent} from "react";
import {CartesianGrid, Line, LineChart, AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DateTime} from "luxon";

const CustomTooltip = ({payload, label, active}) => {
    if(active){
        return(
            <div>
                <p>{label} : {DateTime.fromJSDate(new Date(payload[0].payload.created_at)).toRelative()}</p>
            </div>
        )
    }

    return null;
}

export default class Chart extends PureComponent {
    render(){
        return(
            <ResponsiveContainer width='100%' height={300}>
                <AreaChart data={this.props.data}>
                    <Area dataKey="percent" stroke="#03fcba" fill="#6effd8" fillOpacity={.2}/>
                    <Line datakey="used" stroke="#03fcba" fill="#6effd8"/>
                    <YAxis key="percent" tickLine={false} stroke="#dbdbdb"/>
                    <CartesianGrid vertical={false}/>
                    <Tooltip content={<CustomTooltip />}/>
                    <XAxis key="created_at" tickLine={false} stroke="#dbdbdb"/>
                </AreaChart>
            </ResponsiveContainer>
        )
    }
}