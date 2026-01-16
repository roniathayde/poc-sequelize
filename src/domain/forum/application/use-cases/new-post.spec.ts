import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { InMemoryPostRepository } from '../../../../../test/repositories/in-memory-post-repository'
import { NewPostUseCase } from './new-post'

let inMemoryPostRepository: InMemoryPostRepository
let sut: NewPostUseCase

describe('New Post Use Case', () => {
  beforeEach(() => {
    inMemoryPostRepository = new InMemoryPostRepository()
    sut = new NewPostUseCase(inMemoryPostRepository)
  })

  it('should be able to create a new post', async () => {
    const result = await sut.execute({
      authorId: 'author-1',
      title: 'Título do Post',
      content: 'Conteúdo do post aqui...',
    })

    // Verifica se o resultado é de sucesso (Right)
    expect(result.isRight()).toBe(true)

    // Verifica se o post foi adicionado ao array do repositório
    expect(inMemoryPostRepository.items).toHaveLength(1)

    // Verifica se os dados salvos batem com o input
    expect(inMemoryPostRepository.items[0].title).toBe('Título do Post')
    expect(inMemoryPostRepository.items[0].authorId).toBeInstanceOf(UniqueEntityID)
    expect(inMemoryPostRepository.items[0].authorId.toString()).toBe('author-1')
  })

  it('should return the created post in the response', async () => {
    const result = await sut.execute({
      authorId: 'author-2',
      title: 'Segundo Post',
      content: 'Mais conteúdo',
    })

    // Se result for Right, verificamos o conteúdo do valor retornado
    if (result.isRight()) {
      expect(result.value.post.id).toBeDefined()
      expect(result.value.post.title).toBe('Segundo Post')
    }
  })
})