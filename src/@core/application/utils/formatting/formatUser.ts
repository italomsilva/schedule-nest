import { User } from "../../../domain/entities/User";

export function formatUser(user:User){
    return{
        id: user.id,
        token: user.sessionToken,
        fullname: user.fullName,
        document: user.document,
        phone:user.phone,
        methods: user.methods || [],
    }
}