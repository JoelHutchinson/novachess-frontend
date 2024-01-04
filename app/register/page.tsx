import Link from 'next/link';
import { redirect } from 'next/navigation';
import { fetchUser, createUser } from '@/app/_lib/data-service';
import { register } from '@/app/_lib/actions';
import RegisterScreen from '../_ui/registerscreen';

export default function Page() {
  return (
    <RegisterScreen />
  );
}
