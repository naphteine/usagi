import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession } from '@supabase/auth-helpers-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import styles from "../styles/Login.module.css";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
    const session = useSession()
    const router = useRouter()
    const supabase = useSupabaseClient()

    return (
        <div className={styles.loginForm}>
            <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="light"
                localization={{
                    variables: {
                        "sign_up": {
                            "email_label": "E-Mail",
                            "password_label": "Şifre",
                            "email_input_placeholder": "email adresiniz",
                            "password_input_placeholder": "şifreniz",
                            "button_label": "kayıt ol",
                            "loading_button_label": "Signing up ...",
                            "social_provider_text": "Sign in with",
                            "link_text": "Hesabınız yok mu? Kayıt olun!"
                          },
                          "sign_in": {
                            "email_label": "E-Mail",
                            "password_label": "Şifre",
                            "email_input_placeholder": "email adresiniz",
                            "password_input_placeholder": "şifreniz",
                            "button_label": "giriş yap",
                            "loading_button_label": "Giriş yapılıyor ...",
                            "social_provider_text": "Sign in with",
                            "link_text": "Hesabınız var mı? Giriş yapın!"
                          },
                          "magic_link": {
                            "email_input_label": "Email address",
                            "email_input_placeholder": "Your email address",
                            "button_label": "Send Magic Link",
                            "link_text": "Send a magic link email"
                          },
                          "forgotten_password": {
                            "email_label": "Email address",
                            "password_label": "Your Password",
                            "email_input_placeholder": "Your email address",
                            "button_label": "Send reset password instructions",
                            "link_text": "Şifremi unuttum"
                          },
                          "update_password": {
                            "password_label": "New password",
                            "password_input_placeholder": "Your new password",
                            "button_label": "Update password"
                          }
                    }
                }}
            />
        </div>
    )
}

export default Login;