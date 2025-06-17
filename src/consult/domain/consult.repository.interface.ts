export interface IConsultMeeting {
    meeting(customerId: string, consultId: string, token: string): Promise<string>
}