import app, { auth } from '@/firebase/connect';
import { deleteUser, onAuthStateChanged, reauthenticateWithCredential, updateEmail, updateProfile, verifyBeforeUpdateEmail } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { BiCamera } from 'react-icons/bi';
import Image from 'next/image';
function Account() {
    const [authUser, setAuthUser] = React.useState<any>(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
    }, []);
     async function DeleteAccount() {

        // const credential = promptForCredentials();

        // reauthenticateWithCredential(user, credential).then(() => {
        // // User re-authenticated.
        // }).catch((error) => {
        // // An error ocurred
        // // ...
        // });
        // authUser?.delete()
        deleteUser(authUser).then(() => {
            // User deleted.
            router.push("/")
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }

    const router = useRouter();
    const [edit, setEdit] = React.useState(false);
    const [photo, setPhoto] = React.useState<any>(null);
    const [photoURL, setPhotoURL] = React.useState<any>();

    const handlePhotoChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);
            setPhotoURL(URL.createObjectURL(file));
        }
    };

    const handleImage = async () => {
        if (!photo) {
            return;
        }

        const storage = getStorage(app);
        const storageRef = ref(storage, `profilePictures/${authUser.uid}`);
        await uploadBytes(storageRef, photo);

        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(authUser, { photoURL: downloadURL });
        setPhotoURL(downloadURL);
        
    };

    const handleEdit = async () => {
        await handleImage();
        await updateProfile(authUser, { displayName: name });
        await verifyBeforeUpdateEmail(authUser, email);
        setEdit(false);
        
        router.reload();
    };

    const [name, setName] = React.useState(authUser?.displayName);
    const [email, setEmail] = React.useState(authUser?.email);
    

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-2xl font-semibold'>Account</h1>
            <div className='flex flex-row gap-10 items-center w-full relative'>
                {
                    !edit ?
                        <>
                            <Image width={150} height={150} src={authUser?.photoURL ?? "/user3.png"} className='w-[150px] h-[150px]  object-cover rounded-lg shadow-xl' alt="" />
                            <div className='flex flex-col gap-4'>
                                <h1 className='text-3xl font-semibold'>{authUser?.displayName}</h1>
                                <h1>{authUser?.email}</h1>
                            </div>
                        </> :
                        <>
                            <div className='h-[150px] w-[150px]'>
                                <Image width={150} height={150} src={photoURL ?? authUser?.photoURL ?? "/user3.png"} className=' object-cover rounded-lg shadow-xl w-[150px] h-[150px]' alt="" />
                                <input type="file" accept="image/*" className='opacity-0 absolute z-[2] top-0 left-0 w-[150px] h-[150px] cursor-pointer' onChange={handlePhotoChange} />
                                <div className='absolute z-[1] bottom-1 left-1 bg-black/20 p-1 rounded-full'>
                                    <BiCamera size={20} />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <input onChange={(e) => setName(e.target.value)} type="text" defaultValue={authUser?.displayName} className='p-1 px-2 rounded-xl text-3xl font-semibold focus:outline-none border-2' />
                                <input onChange={(e) => setEmail(e.target.value)} type="text" defaultValue={authUser?.email} className='p-1 px-2 rounded-xl focus:outline-none border-2' />
                            </div>
                        </>
                }
                <div className='absolute right-4 bottom-0 flex flex-row gap-4'>
                    {
                        edit ? (
                            <button onClick={handleEdit} className=' bg-blue-800 text-white p-3 rounded-xl'>Save</button>
                        ) : (
                            <button onClick={() => setEdit(true)} className=' bg-blue-800 text-white p-3 rounded-xl'>Edit</button>
                        )
                    }
                    <button onClick={DeleteAccount} className=' bg-red-800 text-white p-3 rounded-xl'>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default Account;
function promptForCredentials() {
    throw new Error('Function not implemented.');
}

