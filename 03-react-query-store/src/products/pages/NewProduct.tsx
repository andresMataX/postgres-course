import { Button, Image, Input, Textarea } from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useProductMutation } from '../../hooks/useProductMutation'

interface Inputs {
  title: string
  price: number
  description: string
  category: string
  image: string
}

export const NewProduct = () => {
  const productMutation = useProductMutation()

  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      title: 'Memoria RAM',
      price: 100,
      description:
        'Nostrud anim officia eu in aliquip quis aute nisi officia esse deserunt eu. Pariatur nostrud voluptate voluptate deserunt in nulla duis nostrud aliquip ut enim laboris non.',
      category: 'men clothing',
      image:
        'https://media.discordapp.net/attachments/807748553799368716/808522481102618624/Screenshot_20210207-191337_Messenger.jpg?ex=653729bd&is=6524b4bd&hm=9c6a1ce00a1e2d8ad1aa68a2443d14cf122ad09ed65c02d36b37563e476527fa&=&width=618&height=616',
    },
  })

  const newImage = watch('image')

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    productMutation.mutate(data)
  }

  return (
    <div className='w-full flex-col' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-2xl font-bold'>Nuevo producto</h1>

      <form className='w-full'>
        <div className='flex justify-around items-center'>
          <div className='flex-col w-[500px]'>
            <Controller
              control={control}
              name='title'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='text'
                  label='Titulo del producto'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='price'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='number'
                  label='Precio del producto'
                  value={field.value.toString()}
                  onChange={(ev) => field.onChange(+ev.target.value)}
                />
              )}
            />

            <Controller
              control={control}
              name='image'
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  className='mt-2'
                  type='url'
                  label='Url del producto'
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <Controller
              control={control}
              name='description'
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  className='mt-2'
                  value={field.value}
                  onChange={field.onChange}
                  label='Descripcion del producto'
                />
              )}
            />

            <Controller
              control={control}
              name='category'
              render={({ field }) => (
                <select
                  className='rounded-md p-3 mt-2 bg-gray-800 w-full'
                  value={field.value}
                  onChange={field.onChange}
                >
                  <option value="men's clothing">Men's clothing</option>
                  <option value="women's clothing">Women's clothing</option>
                  <option value='jewelery'>Jewelery</option>
                  <option value='electronics'>Electronics</option>
                </select>
              )}
            />

            <br />

            <Button
              className='mt-2'
              color='primary'
              type='submit'
              isDisabled={productMutation.isLoading}
            >
              {productMutation.isLoading ? 'Cargando...' : 'Crear producto'}
            </Button>
          </div>

          <div
            className='bg-white rounded-2xl p-10 flex items-center'
            style={{
              width: '500px',
              height: '600px',
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  )
}
