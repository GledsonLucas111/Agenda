import { axiosInstance } from "@/constants/axiosInstance";

export class EventService {
    list(id: string){
        return axiosInstance.get(`/event/${id}`)
    }

    create(body: {description: string, startDate: Date, endDate: Date, authorId: number}){
        return axiosInstance.post("/event", body)
    }
}