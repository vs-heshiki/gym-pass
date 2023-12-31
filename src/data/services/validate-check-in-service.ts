import { ResourceNotFoundError, TimeExceededError } from '@/data/errors'
import { ValidateCheckIn } from '@/domain/contracts'
import { CheckInRepository } from '@/infra/repositories'
import { CheckIn } from '@prisma/client'

export class ValidateCheckInService implements ValidateCheckIn {
    constructor (private readonly checkInRepository: CheckInRepository) { }

    async execute ({ checkInId }: ValidateCheckIn.Input): Promise<CheckIn> {
        const checkIn = await this.checkInRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        const checkInValidated = await this.checkInRepository.validate(checkIn)

        if (!checkInValidated) {
            throw new TimeExceededError()
        }
        return checkInValidated
    }


}
