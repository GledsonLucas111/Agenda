import { axiosInstance } from "@/constants/axiosInstance";

export class ScheduleService {
    list(){
        return axiosInstance.get("/schedule")
    }

    create(body: any){
        return axiosInstance.post("/schedule", body)
    }
}