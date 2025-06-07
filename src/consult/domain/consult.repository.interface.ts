export interface IConsultMeeting {
    meeting(customerId: string, consultId: string): Promise<string>
}