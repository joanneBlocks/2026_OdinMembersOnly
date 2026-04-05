import { useState } from 'react'
import ReactDOM from 'react-dom/client'

function MessageCard({ message, currentUser }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [animating, setAnimating] = useState(false)

  const handleLike = () => {
    if (animating) return
    setAnimating(true)
    setLiked(prev => !prev)
    setLikeCount(prev => liked ? prev - 1 : prev + 1)
    setTimeout(() => setAnimating(false), 300)
  }

  return (
    <div className="bg-champagne dark:bg-dustyMauve rounded-card shadow-soft border border-softGold border-opacity-20 hover:shadow-elevated transition-all duration-300 hover:scale-[1.01] overflow-hidden">

      {/* Full width image */}
      {message.imageUrl && (
        <img
          src={message.imageUrl}
          alt={message.title}
          className="w-full object-cover max-h-72"
        />
      )}

      <div className="p-6">
        <h2 className="font-serif text-xl font-semibold text-deepPlum dark:text-ivory mb-3">
          {message.title}
        </h2>
        <p className="text-warmGray text-sm leading-relaxed">
          {message.text}
        </p>

        {/* Member-only meta */}
        {currentUser?.isMember && (
          <div className="mt-4 pt-4 border-t border-softGold border-opacity-20 flex justify-between items-center">
            <span className="text-xs text-warmGray tracking-wide">
              By <span className="text-roseGold">
                {message.author.firstName} {message.author.lastName}
              </span>
              · {new Date(message.createdAt).toDateString()}
            </span>

            {/* Admin delete */}
            {currentUser?.isAdmin && (
              <form method="POST" action={`/messages/${message.id}/delete`}>
                <button
                  type="submit"
                  className="text-xs text-warmGray hover:text-roseGold dark:text-warmGray dark:hover:text-roseGold tracking-widest uppercase transition-colors duration-200"
                >
                  Delete
                </button>
              </form>
            )}
          </div>
        )}

        {/* Like button */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleLike}
            style={{
              transform: animating ? 'scale(1.4)' : 'scale(1)',
              transition: 'transform 0.2s ease-in-out'
            }}
            className="text-xl focus:outline-none"
            aria-label="Like this message"
          >
            {liked ? '🌸' : '🤍'}
          </button>
          {likeCount > 0 && (
            <span className="text-xs text-warmGray dark:text-warmGray">
              {likeCount}
            </span>
          )}
        </div>
      </div>

    </div>
  )
}

function MessageBoard({ messages, currentUser }) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-serif text-2xl text-deepPlum dark:text-ivory mb-3">
          No messages yet
        </p>
        <p className="text-warmGray text-sm">
          Be the first to share something hopeful.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {messages.map(message => (
        <MessageCard
          key={message.id}
          message={message}
          currentUser={currentUser}
        />
      ))}
    </div>
  )
}

// Boot the app
const container = document.getElementById('message-board-root')
if (container) {
  const messages = JSON.parse(decodeURIComponent(container.dataset.messages))
  const currentUser = container.dataset.currentUser
    ? JSON.parse(decodeURIComponent(container.dataset.currentUser))
    : null

  ReactDOM.createRoot(container).render(
    <MessageBoard messages={messages} currentUser={currentUser} />
  )
}