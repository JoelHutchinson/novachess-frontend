import LoginForm from '@/app/_ui/loginform';
 
export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{backgroundImage: 'url("/galaxy.png")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <LoginForm />
    </div>
  );
}