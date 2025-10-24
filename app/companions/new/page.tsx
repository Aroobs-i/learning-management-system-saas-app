import CompanionForm from "@/components/CompanionForm"

const NewCompanion = () => {
  return (
    <main className="lg:w-1/3 md:w-2/3 items-center justify-center">
       <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>

          <CompanionForm />
       </article>
    </main>
  )
}

export default NewCompanion