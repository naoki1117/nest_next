import type { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import * as Yup from "yup"
import {IconDatabase} from "@tabler/icons"
import {ShieldCheckIcon} from "@heroicons/react/solid"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import {
  Anchor,
  TextInput,
  Button,
  Group,
  PasswordInput,
  Alert
}
from "@mantine/core"
import { useForm,yupResolver } from "@mantine/form"
import { Layout } from '../components/Layout'
import { AuthForm } from '../types'

const schema = Yup.object().shape({
  email:Yup.string().email("emailを入力してください!").required("emailが入力されていません!"),
  password: Yup.string()
    .required("パスワードが入力されていません!")
    .min(5,"パスワードは最低5文字以上で入力してください!")
})

const Home: NextPage = () => {
  const router = useRouter()
  const [isRegister,setIsRegister] = useState(false)
  const [error,setError] = useState("")
  const form = useForm<AuthForm>({
    validate: yupResolver(schema),
    initialValues:{
      email:"",
      password:"",
    }
  })
  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,{
          email: form.values.email,
          password: form.values.password
        })
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,{
        email: form.values.email,
        password: form.values.password,
      })
      form.reset()
      router.push("/dashboard")
    } 
    catch (e:any) {
      setError(e.respons.data.message)
    }
  }
  return (
    <Layout title='auth'>
      <ShieldCheckIcon className='h-16 w-16 text-blue-500' />
      {error && (
        <Alert
          my="md"
          variant="filled"
          icon={<ExclamationCircleIcon />}
          title="認証エラー!!"
          color="red"
          radius="md"
        >
          {error}
        </Alert>
      )}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mt="md"
            id="email"
            label="Email*"
            placeholder='examle@gmail.com'
            {...form.getInputProps("email")}
          />
          <PasswordInput 
            mt="md"
            id="password"
            placeholder="password"
            label="Password*"
            description="5文字以上で入力"
            {...form.getInputProps("password")}
          />
          <Group mt="xl" position="apart">
            <Anchor
              component='button'
              type='button'
              size="xs"
              className="text-gray-300"
              onClick={() => {
                setIsRegister(!isRegister)
                setError("")
              }}
            >
              {isRegister
                ? "アカウントを持っている場合、ログインしてください"
                : "アカウントを持っていない場合、作成してください"
              }
            </Anchor>
            <Button
              leftIcon={<IconDatabase size={14} />}
              color="cyan"
              type="submit"
            > 
              {isRegister ? "新規登録" : "ログイン"}
            </Button>
          </Group>
        </form>
    </Layout>
  )
}

export default Home
