import { http } from '@/lib/http'
export const getHealth = () => http.get('/actuator/health')
