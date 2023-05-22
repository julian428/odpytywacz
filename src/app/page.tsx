import Image from "next/image";

export default function Home() {
  return (
    <>
      <article className="flex justify-between mt-12 h-screen w-4/5 mx-auto">
        <section>
          <h2 className="text-6xl font-semibold bg-gradient-to-t from-2 to-3 text-transparent bg-clip-text ml-8 mb-4">
            O nas
          </h2>
          <p className="font-light leading-9 text-2xl tracking-wide max-w-3xl">
            Na naszej stronie możesz tworzyć testy, a także brać udział w
            testach przygotowanych przez innych użytkowników. Dzięki temu możesz
            w prosty i przyjemny sposób sprawdzić swoją wiedzę i ocenić swoje
            postępy w nauce. Ponadto, na Odpytywacz możesz również tworzyć blogi
            edukacyjne, dzielić się swoimi doświadczeniami i wiedzą z innymi
            użytkownikami. Możesz także współpracować z innymi osobami i
            przygotowywać wspólnie testy. Nasza platforma jest przyjazna i łatwa
            w obsłudze, dzięki czemu nauka staje się jeszcze bardziej
            interesująca i efektywna. Zapraszamy do korzystania z naszej strony
            i życzymy owocnej nauki!
          </p>
        </section>
        <Image
          src="/learning.svg"
          alt="A person learning"
          width={653}
          height={386}
          className="mt-64"
        />
      </article>
      <article className="mt-48 w-3/4 mx-auto pb-4">
        <h2 className="text-6xl text-center font-semibold bg-gradient-to-t from-2 to-3 text-transparent bg-clip-text mb-4">
          Użytek
        </h2>
        <ul className="list-disc font-light leading-9 text-2xl tracking-wide space-y-8 mt-16">
          <li>
            Rejestracja i logowanie Aby korzystać z funkcjonalności Odpytywacza,
            musisz się zarejestrować i zalogować. Możesz to zrobić poprzez
            kliknięcie przycisku {'"'}Zarejestruj się{'"'} na stronie głównej i
            podanie swoich danych. Po zarejestrowaniu otrzymasz e-mail z linkiem
            aktywacyjnym, który należy kliknąć, aby aktywować konto.
          </li>
          <li>
            Tworzenie testów Po zalogowaniu możesz przejść do sekcji {'"'}Twórz
            test{'"'} i utworzyć własny test. Musisz podać tytuł, opis oraz
            pytania wraz z odpowiedziami. Możesz również wybrać typ testu, np.
            jednokrotnego wyboru, wielokrotnego wyboru lub pytania otwarte. Po
            utworzeniu testu możesz go opublikować, a inni użytkownicy będą
            mogli go rozwiązać.
          </li>
          <li>
            Rozwiązywanie testów Aby rozwiązać test, musisz przejść do sekcji
            {'"'}Rozwiąż test{'"'} i wybrać test, który chcesz przejść.
            Następnie odpowiedz na pytania, wybierając jedną z odpowiedzi lub
            wpisując odpowiedź w polu tekstowym. Po zakończeniu testu otrzymasz
            wynik i szczegółowe odpowiedzi.
          </li>
          <li>
            Tworzenie blogów Aby utworzyć bloga, przejdź do sekcji {'"'}Twórz
            blog{'"'}i podaj tytuł i treść bloga. Możesz dodać obrazy lub
            multimedia, aby wzbogacić swoje wpisy. Po opublikowaniu bloga, inni
            użytkownicy będą mogli go przeczytać i skomentować.
          </li>
          <li>
            Współpraca z innymi użytkownikami Na Odpytywaczu możesz
            współpracować z innymi użytkownikami i tworzyć razem testy. Aby to
            zrobić, przejdź do sekcji {'"'}Współpraca{'"'} i wybierz
            użytkownika, z którym chcesz pracować. Następnie możecie razem
            stworzyć test, edytować go i publikować.
          </li>
        </ul>
        <Image
          src="/blogging.svg"
          alt="A person learning"
          width={983}
          height={471}
          className="mx-auto mt-32"
        />
      </article>
    </>
  );
}
