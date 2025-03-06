import { axiosInstance } from "@/constants/axiosInstance";

export class UserService {
    list(){
        return axiosInstance.get("/user")
    }

    create(body: any){
        return axiosInstance.post("/user", body)
    }

    login(data: any){
        return axiosInstance.post("/login", data)
    }

    decoded(token: any){
        return axiosInstance.post("/decoded", token)
    }
}