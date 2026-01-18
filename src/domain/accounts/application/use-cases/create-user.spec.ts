import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from '../../../../core/errors/user-already-exists-error'
import { InMemoryUserRepository } from '../../../../../test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: CreateUserUseCase // System Under Test

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(1)
    expect(inMemoryUserRepository.items[0].username).toEqual('John Doe')
    //  caso either tenha o valor em result.value (opcional)
    if (result.isRight()) {
      expect(result.value.user.username).toBe('John Doe')
    }
  })

  it('should not be able to create a new user with same email twice', async () => {
    const email = 'same-email@example.com'

    // Cria o primeiro usuário
    await sut.execute({
      username: 'User 01',
      email,
      password: 'password',
    })

    // Tenta criar o segundo com mesmo e-mail
    const result = await sut.execute({
      username: 'User 02',
      email,
      password: 'password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
    // Garante que ainda só existe 1 usuário no banco
    expect(inMemoryUserRepository.items).toHaveLength(1)
  })
})