CREATE TABLE IF NOT EXISTS users (
	id bigint NOT NULL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	salt VARCHAR(255) NOT NULL,
	isValidated BOOLEAN NOT NULL DEFAULT '0',
	isBanned BOOLEAN NOT NULL DEFAULT '0',
	displayName VARCHAR(255) DEFAULT '',
	bio TEXT DEFAULT '',
	avatar VARCHAR(255) DEFAULT '',
	banner VARCHAR(255) DEFAULT '',
	prefferedLanguage VARCHAR(255) NOT NULL DEFAULT 'en-US',
	isFollowingPublic BOOLEAN NOT NULL DEFAULT '1',
	isFollowersPublic BOOLEAN NOT NULL DEFAULT '1',
	isPostsPublic BOOLEAN NOT NULL DEFAULT '1',
	isLikesPublic BOOLEAN NOT NULL DEFAULT '1'
);

CREATE INDEX usersIdIdx ON users (id);

CREATE INDEX usernameIdx ON users (username);

CREATE TABLE IF NOT EXISTS posts (
	id bigint NOT NULL PRIMARY KEY,
	authorId bigint NOT NULL,
	content TEXT DEFAULT '',
	replyTo bigint DEFAULT '0',
	quoteOf bigint DEFAULT '0',
	score integer NOT NULL DEFAULT '0',
	attachments VARCHAR [] DEFAULT '{}'
);

CREATE INDEX postsIdIdx ON posts (id);

CREATE INDEX postsAuthorIdIdx ON posts (authorId);

CREATE INDEX postsReplyToIdx ON posts (replyTo);

CREATE TABLE IF NOT EXISTS likes (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	postId bigint NOT NULL
);

CREATE INDEX likesUserIdx ON likes (userId);

CREATE INDEX likesPostIdIdx ON likes (postId);

CREATE TABLE IF NOT EXISTS follows (
	id bigint NOT NULL PRIMARY KEY,
	followerId bigint NOT NULL,
	followedId bigint NOT NULL
);

CREATE INDEX followsFollowerIdx ON follows (followerId);

CREATE INDEX followsFollowedIdx ON follows (followedId);

CREATE TABLE IF NOT EXISTS messages (
	id bigint NOT NULL PRIMARY KEY,
	senderId bigint NOT NULL,
	chatId bigint NOT NULL,
	content TEXT DEFAULT '',
	attachments VARCHAR [] DEFAULT '{}'
);

CREATE INDEX msgsSenderIdx ON messages (senderId);

CREATE INDEX msgsChatIdx ON messages (chatId);

CREATE TABLE IF NOT EXISTS chats (
	id bigint NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL DEFAULT '',
	members bigint [],
	coverImage VARCHAR(255) DEFAULT '{}'
);

CREATE INDEX chatsIdIdx ON chats (id);

CREATE TABLE IF NOT EXISTS bookmarks (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	postId bigint NOT NULL
);

CREATE INDEX bookmarksUserIdx ON bookmarks (userId);

CREATE INDEX bookmarksPostIdx ON bookmarks (postId);

CREATE TABLE IF NOT EXISTS tokens (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	token VARCHAR(255) NOT NULL,
	device VARCHAR(255) NOT NULL
);

CREATE INDEX tokensUserIdx ON tokens (userId);

CREATE INDEX tokensTokenIdx ON tokens (token);

CREATE TABLE IF NOT EXISTS verifications (
	id bigint NOT NULL PRIMARY KEY,
	userId bigint NOT NULL,
	code VARCHAR(255) NOT NULL,
	validUntil timestamp NOT NULL
);

CREATE INDEX verifUserIdx ON verifications (userId);

CREATE INDEX verifCodeIdx ON verifications (code);

ALTER TABLE IF EXISTS public.bookmarks
ADD CONSTRAINT "userRestrict" FOREIGN KEY (userid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.bookmarks
ADD CONSTRAINT "postRestrict" FOREIGN KEY (postid) REFERENCES public.posts (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.follows
ADD CONSTRAINT "followerRestrict" FOREIGN KEY (followerid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.follows
ADD CONSTRAINT "followedRestrict" FOREIGN KEY (followedid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.likes
ADD CONSTRAINT "userRestrict" FOREIGN KEY (userid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.likes
ADD CONSTRAINT "postRestrict" FOREIGN KEY (postid) REFERENCES public.posts (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.messages
ADD CONSTRAINT "senderRestrict" FOREIGN KEY (senderid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.messages
ADD CONSTRAINT "chatRestrict" FOREIGN KEY (chatid) REFERENCES public.chats (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.posts
ADD CONSTRAINT "authorRestrict" FOREIGN KEY (authorid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.posts
ADD CONSTRAINT "replyRestrict" FOREIGN KEY (replyto) REFERENCES public.posts (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.posts
ADD CONSTRAINT "quoteRestrict" FOREIGN KEY (quoteof) REFERENCES public.posts (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.tokens
ADD CONSTRAINT "userRestrict" FOREIGN KEY (userid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

ALTER TABLE IF EXISTS public.verifications
ADD CONSTRAINT "userRestrict" FOREIGN KEY (userid) REFERENCES public.users (id) MATCH SIMPLE ON
UPDATE NO ACTION ON
DELETE NO ACTION NOT VALID;

CREATE VIEW public.usersDetails AS
SELECT id,
	username,
	displayname,
	bio,
	avatar,
	banner,
	isfollowerspublic,
	isfollowingpublic,
	ispostspublic,
	islikespublic,
	(
		SELECT count(l1.*) AS count
		FROM likes l1
		WHERE l1.userid = users.id
	) AS countlikes,
	(
		SELECT count(p1.*) AS count
		FROM posts p1
		WHERE p1.authorid = users.id
	) AS countposts,
	(
		SELECT count(f1.*) AS count
		FROM follows f1
		WHERE f1.followerid = users.id
	) AS countisfollowing,
	(
		SELECT count(f2.*) AS count
		FROM follows f2
		WHERE f2.followedid = users.id
	) AS countfollowedby
FROM users;

ALTER TABLE public.test OWNER TO postgres;

--TEMPORARY STUFF
SELECT posts.id,
	"usersDetails".id as authorId,
	"usersDetails".username,
	"usersDetails".displayname,
	"usersDetails".bio,
	"usersDetails".avatar,
	"usersDetails".banner,
	"usersDetails".isfollowerspublic,
	"usersDetails".isfollowingpublic,
	"usersDetails".ispostspublic,
	"usersDetails".islikespublic,
	"usersDetails".countlikes,
	"usersDetails".countposts,
	"usersDetails".countisfollowing,
	"usersDetails".countfollowedby,
	posts.content,
	posts.replyTo,
	posts.quoteOf,
	posts.attachments,
	(
		SELECT COUNT(*)
		FROM likes l1
		WHERE l1.postid = posts.id
	) as postCountLikes,
	(
		SELECT COUNT(*)
		FROM posts p1
		WHERE p1.quoteof = posts.id
	) AS postCountQuotes,
	(
		SELECT COUNT(*)
		FROM posts p2
		WHERE p2.replyto = posts.id
	) AS postCountReplies,
	(
		SELECT CASE
				WHEN COUNT(*) > 0 THEN true
				ELSE false
			END
		FROM likes l1
			JOIN tokens t1 ON t1.userid = l1.userid
		WHERE posts.id = l1.postid
			AND t1.token = $1
	) AS isPostLiked,
	(
		SELECT CASE
				WHEN COUNT(*) > 0 THEN true
				ELSE false
			END
		FROM bookmarks b1
			JOIN tokens t2 ON t2.userid = b1.userid
		WHERE posts.id = b1.postid
			AND t2.token = $1
	) AS isPostBookmarked
FROM posts
	JOIN "usersDetails" ON posts.authorid = "usersDetails".id
WHERE "usersDetails".username = $2
ORDER BY posts.id DESC
LIMIT 50 OFFSET $3