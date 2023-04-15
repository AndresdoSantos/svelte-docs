<script lang="ts">
  import { parse } from './utils/parse'
  import { slug } from './utils/slug'
  import { stringify } from './utils/stringify'

  import Title from './lib/Title.svelte'

  import './app.css'

  type TCourse = {
    slug: string
    name: string
    isFocused: boolean
    isCompleted: boolean
    createdAt: Date
  }

  const courses = parse<TCourse[]>(
    window.localStorage.getItem('@gorillaz:courses')
  )

  let field = ''

  let focusedCourse = courses.find((item) => item.isFocused)

  let unfocusedCourses = courses.filter((item) => !item.isFocused)

  let onCreateNewCourse = () => {
    const course: TCourse = {
      createdAt: new Date(),
      isCompleted: false,
      name: field,
      isFocused: !courses,
      slug: slug(field)
    }

    window.localStorage.setItem(
      '@gorillaz:courses', 
      stringify<TCourse[]>((courses) ? [...courses, course] : [course])
    )

    field = ''
  }
</script>

<main class="mx-auto h-screen max-w-5xl pt-10 px-10 sm:px-0 relative">
  <Title title="Courses" />

  <section class="mt-10 mb-5">
    <span class="text-zinc-500 tracking-widest text-[11px] sm:text-xs">FOCUS</span>
  </section>

  <div class="flex items-center">
    <button class="h-5 w-5 border mr-4 bg-zinc-800"></button>

    <p class="text-xs text-white uppercase">{focusedCourse.name}</p>
  </div>

  {#if unfocusedCourses}
    <ul>
      <section class="mt-10 mb-5">
        <span class="text-zinc-500 tracking-widest text-[11px] sm:text-xs">OTHERS COURSES</span>
      </section>

      {#each unfocusedCourses as course, i}
        <li class="flex items-center mb-3">
          <button class="h-5 w-5 border mr-4 bg-zinc-800"></button>

          <p class="text-xs text-white uppercase">{course.name}</p>
        </li>
      {/each}
    </ul>
  {/if}

  <footer class="flex items-center justify-between absolute bottom-5 w-full gap-x-4">
    <input 
      type="text" 
      bind:value={field}
      class="w-full h-9 sm:h-12 bg-zinc-800/30 outline-none px-2 sm:px-4 text-white text-xs sm:text-sm -tracking-wide focus:border-zinc-700 placeholder:text-zinc-600 rounded-md sm:rounded-xl border border-zinc-800" 
      placeholder="Register your course here"
    />

    <button 
      on:click={onCreateNewCourse} 
      class="bg-white h-9 sm:h-12 w-1/3 rounded-md sm:rounded-xl text-zinc-700 text-xs sm:text-sm transition-[:hover] duration-150 hover:brightness-90"
    >
      Let's go
    </button>
  </footer>
</main>
