<template>
    <div class="relative">
        <svg class="absolute top-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,320L80,320C160,320,320,320,480,282.7C640,245,800,171,960,138.7C1120,107,1280,117,1360,122.7L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
        <div class="h-screen flex flex-col justify-center items-center p-5">
            <img class="m-5" src="https://d2sbaogcozkhdh.cloudfront.net/assets/prod/uploads/avances-software-s-a-s" alt="">
            <form class="flex flex-col gap-5 p-5 rounded-lg" action="POST">
                <div class="flex flex-col gap-2">
                    <label class="text-sky-500 font-bold" for="type">Type: </label>
                    <select class="p-2.5 bg-gray-200 rounded outline-none border-none" name="type" id="">
                    <option value="patient" selected>Patient</option>
                    <option value="professional">Professional</option>
                    </select>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sky-500 font-bold" for="type">Identification: </label>
                    <input class="p-2 bg-gray-200 rounded outline-none" type="text" placeholder="Identification number">
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sky-500 font-bold" for="type">Password:</label>
                    <input class="p-2 bg-gray-200 rounded outline-none" type="password" placeholder="Password">
                </div>
            </form>
        </div>
        <svg class="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,288L80,282.7C160,277,320,267,480,256C640,245,800,235,960,213.3C1120,192,1280,160,1360,144L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
    </div>
</template>

<script>
    export default {};
</script>