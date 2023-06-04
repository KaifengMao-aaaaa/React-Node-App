import { Paper } from "@mui/material";
import { makeRequest } from "../../utils/requestWrapper";
import React from "react";
import{backgroundColour} from '../../setting'
export default function ListUsers() {
    const [usersList, setUsersList] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect(function() {
        makeRequest('GET', 'USER_LISTALL', {})
            .then(({data}) => {
                if (data) {
                    setUsersList(data.users)
                    setLoading(true)
                }
            })
            .catch((e) => console.log(e))
    }, [])
    return (<Paper style={{flexWrap: 'wrap',display:'flex', backgroundColor: backgroundColour,width:1000}}>
        {usersList.map((user) => 
            <Paper style={{width: 300,margin:15, height: 300, padding:15}}>
                {`id : ${user.id}`}
                {<h2>{user.name}</h2>

            }</Paper>
        )}
    </Paper>)
}