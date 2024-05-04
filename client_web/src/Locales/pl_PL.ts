export const pl_PL = {
	appName: "Ghaspy",
	hello: "cześć {{ name }}, jak się masz?",
	loading: "Ładowanie...",

	relativeTime: {
		future: "w {{in}}",
		past: "{{ago}} temu",
		s: "sekunde",
		ss: "{{x}} sekund",

		m: "minute",
		mm: "{{x}} minut",
		h: "godzine",
		hh: "{{x}} godzin",
		d: "dzień",
		dd: "{{x}} dni",
		M: "miesiąc",
		MM: "{{x}} miesięcy",
		y: "rok",
		yy: "{{x}} lat",
	},
	nav: {
		home: "Strona główna",
		explore: "Odkrywaj",
		alerts: "Powiadomienia",
		inbox: "Wiadomości",
		lists: "Listy",
		bookmarks: "Piny",
		profile: "Profil",
		more: "Więcej",
		settings: "Ustawienia",

		logIn: "Zaloguj się",
		signUp: "Zarejestruj się",
		logOut: "Wyloguj",
	},

	login: {
		logIn: "Zaloguj się",
		logInDescription: "Zaloguj się do swojego konta używając swojego adresu email i hasła",
		errorLabel: "Błąd:",
		email: "Email",
		emailExample: "przyklad@email.com",

		password: "Hasło",
		passwordRepeat: "Powtórz hasło",
		username: "Nazwa użytkownika",
	},
	profile: {
		edit: "Edytuj Profil",
		bio: "Opis",
		submit: "Zapisz",
		follow: "Obserwuj",
		unfollow: "Odobserwuj",
		mutual: "Znajomy",
		followsYou: "Obserwuje cie",
		following: "Obserwujących",
		followers: "Obserwowanych",
		posts: "Postów",
		likes: "Polubień",
		you: "Ty",
	},
	signUp: {
		email: "Email",
		password: "Hasło",
		emailExample: "przyklad@email.com",
		signUp: "Zarejestruj się",
		requirements: "Wymagania",
		description: "Zarejestruj się, aby korzystać z naszej platformy",
	},
	posts: {
		posts: "Posty",
		likes: "Polubienia",
		whatsHappening: "Co się dzieje?",
		post: "Opublikuj",
	},
	authErrors: {
		signupUsernameTooShort: "Nazwa użytkownika musi mieć minimum 3 znaki",
		signupUsernameTooLong: "Nazwa użytkownika nie może być dłuższa niż 64 znaki",
		signupUsernameNoSpecials: "Tylko te znaki specjalne: , . - _ są dozwolone w nazwie użytkownika",
		signupUsernameNoSpaces: "Nazwa użytkownika nie może zawierać spacji",
		signupUsernameTaken: "Ta nazwa użytkownika jest już zajęta",

		signupPasswordTooShort: "Hasło musi mieć minimum 8 znaków",
		signupPasswordCapital: "Hasło musi zawierać wielką literę",
		signupPasswordLetter: "Hasło musi zawierać literę",
		signupPasswordNumber: "Hasło musi zawierać cyfrę",
		signupPasswordNoSpaces: "Hasło nie może zawierać spacji",

		signupPasswordRepeat: "Hasła muszą być takie same",

		signupEmailInvalid: "Niepoprawny adres email",
		signupEmailTaken: "Ten adres email jest już zajęty",
	},
	errors: {
		loginDataIncorrect: "Email lub hasło jest niepoprawne",
		loginFieldEmpty: "Email lub hasło jest puste",
		loginUnvalidated: "Email nie został jeszcze zweryfikowany",
		loginCantGenerateToken: "Nie można wygenerować tokenu",
		loginCantInsertToken: "Nie można wstawić tokenu",
		invalidRequest: "Niepoprawne zapytanie",
		internalError: "Wewnętrzny błąd serwera",
		internalErrorCrit: "Krytyczny wewnętrzny błąd serwera",
		unauthorized: "Nie masz uprawnień do wykonania tej akcji",
		cantUnmarshal: "Dane zostały wysłane w niepoprawnym formacie",
		invalidToken: "Niepoprawny token",
		verificationCodeInvalid: "Niepoprawny kod weryfikacyjny",
		verificationCodeOutdated: "Kod weryfikacyjny nie jest już prawidłowy, nowy kod został wysłany na pocztę elektroniczną",
		userAlreadyValidated: "Użytkownik jest już zweryfikowany",
		cantReadFile: "Nie można odczytać pliku",
		badRequestNoUsername: "Nie podano nazwy użytkownika",
		badRequestQuoteOf: "Nie można odczytać podanego cytatu",
		badRequestReplyTo: "Nie można odczytać podanej odpowiedzi",
		badRequestContentTooLong: "Treść jest zbyt długa",
		badRequestNoContent: "Treść jest pusta",
		badRequestID: "Podane ID nie jest liczbą",
		badRequestNotNumber: "Podane dane nie są liczbą",
		cantReadForm: "Nie można odczytać formularza",
	},
	success: {
		userRegistered: "Użytkownik zarejestrowany pomyślnie",
		userLoggedIn: "Zalogowano pomyślnie",
		userLoggedOut: "Wylogowano pomyślnie",
		userValidated: "Użytkownik zweryfikowany pomyślnie",
		displayNameChanged: "Nazwa wyświetlana zmieniona pomyślnie",
		bioChanged: "Opis zmieniony pomyślnie",
		isFollowersPublicToggled: "Ustawienia obserwujących zmienione pomyślnie",
		isFollowingPublicToggled: "Ustawienia obserwowanych zmienione pomyślnie",
		isPostsPublicToggled: "Ustawienia postów zmienione pomyślnie",
		isLikesPublicToggled: "Ustawienia polubień zmienione pomyślnie",
		avatarChanged: "Zdjęcie profilowe zmienione pomyślnie",
		bannerChanged: "Baner zmieniony pomyślnie",
		bookmarkAdded: "Dodano do zakładek",
		bookmarkRemoved: "Usunięto z zakładek",
		likeAdded: "Polubiono",
		likeRemoved: "Usunięto polubienie",
		followAdded: "Zacząłeś obserwować",
		followRemoved: "Przestałeś obserwować",
		postAdded: "Dodano post",
		postRemoved: "Usunięto post",
	},
};
