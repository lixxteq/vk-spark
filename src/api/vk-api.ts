import axios from "axios";
import { useQuery } from "react-query";


const useGetUserAudios = (userData) => {
    return useQuery('user-audio', (userData) => {
    })
}

export { useGetUserAudios }