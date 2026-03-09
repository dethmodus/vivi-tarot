import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

// Tarot Cards Data
const tarotCards = [
  { number: '0', name: 'Шут', meaning: 'Новые начинания, спонтанность, вера в жизнь. Время сделать прыжок веры.' },
  { number: 'I', name: 'Маг', meaning: 'Сила воли, мастерство, творчество. Время действовать и использовать свои ресурсы.' },
  { number: 'II', name: 'Верховная Жрица', meaning: 'Интуиция, тайны, подсознание. Прислушайтесь к своему внутреннему голосу.' },
  { number: 'III', name: 'Императрица', meaning: 'Изобилие, творчество, плодородие. Время создавать и развивать.' },
  { number: 'IV', name: 'Император', meaning: 'Структура, власть, стабильность. Время установить границы и порядок.' },
  { number: 'V', name: 'Иерофант', meaning: 'Традиции, обучение, духовность. Ищите мудрость и наставничество.' },
  { number: 'VI', name: 'Влюблённые', meaning: 'Любовь, выбор, гармония. Прислушайтесь к сердцу и сделайте выбор.' },
  { number: 'VII', name: 'Колесница', meaning: 'Победа, воля, движение вперёд. Преодолейте препятствия силой духа.' },
  { number: 'VIII', name: 'Сила', meaning: 'Храбрость, терпение, мягкая сила. Управляйте ситуацией с достоинством.' },
  { number: 'IX', name: 'Отшельник', meaning: 'Самоанализ, поиск истины, одиночество. Время для размышлений.' },
  { number: 'X', name: 'Колесо Фортуны', meaning: 'Перемены, удача, циклы. Жизнь меняется — примите это.' },
  { number: 'XI', name: 'Справедливость', meaning: 'Баланс, истина, карма. Получите то, что заслужили.' },
  { number: 'XII', name: 'Повешенный', meaning: 'Пауза, жертва, новый взгляд. Отпустите старое ради нового.' },
  { number: 'XIII', name: 'Смерть', meaning: 'Трансформация, конец, возрождение. Старое уходит — новое приходит.' },
  { number: 'XIV', name: 'Умеренность', meaning: 'Баланс, терпение, гармония. Найдите золотую середину.' },
  { number: 'XV', name: 'Дьявол', meaning: 'Зависимости, страхи, иллюзии. Освободитесь от ограничений.' },
  { number: 'XVI', name: 'Башня', meaning: 'Внезапные перемены, разрушение, освобождение. Крах ведёт к обновлению.' },
  { number: 'XVII', name: 'Звезда', meaning: 'Надежда, вдохновение, исцеление. Свет в конце туннеля.' },
  { number: 'XVIII', name: 'Луна', meaning: 'Иллюзии, страхи, интуиция. Доверьтесь своему внутреннему зрению.' },
  { number: 'XIX', name: 'Солнце', meaning: 'Радость, успех, жизненная сила. Время триумфа и счастья.' },
  { number: 'XX', name: 'Суд', meaning: 'Возрождение, призвание, прощение. Ответ на ваш внутренний зов.' },
  { number: 'XXI', name: 'Мир', meaning: 'Завершение, целостность, успех. Вы достигли цели.' }
]

const reviews = [
  { text: '"Виви помогла мне увидеть ситуацию с совершенно другой стороны. После консультации я поняла, что боялась перемен, хотя они были необходимы. Спасибо за ясность и поддержку!"', author: 'Анна К.', date: '15 февраля 2024' },
  { text: '"Очень чуткий и внимательный таролог. Карты легли точно в точку. Получила не только ответы на вопросы, но и рекомендации к действию. Рекомендую!"', author: 'Мария С.', date: '8 февраля 2024' },
  { text: '"Брала расклад на отношения. Виви всё подробно объяснила, дала советы. Через месяц ситуация разрешилась именно так, как карты показали. Магия!"', author: 'Елена В.', date: '25 января 2024' }
]

const services = [
  { icon: '🔮', title: 'Разбор ситуации', description: 'Краткий анализ текущей ситуации. 3-5 карт для понимания происходящего и рекомендаций к действию.', price: 18000, time: '30 мин' },
  { icon: '🌙', title: 'Глубокий расклад', description: 'Детальный разбор сложной ситуации. Расклад на 10-12 карт с полным анализом причин, текущего состояния и путей решения.', price: 33000, time: '60 мин' },
  { icon: '⭐', title: 'Карта дня', description: 'Ежедневное руководство от карт Таро. Получите совет и энергетическую поддержку на сегодняшний день.', price: 6000, time: 'раз' },
  { icon: '📚', title: 'Мастер-класс', description: 'Индивидуальное обучение основам Таро. Изучение колоды, базовые расклады и развитие интуиции.', price: 51000, time: '90 мин' },
  { icon: '💫', title: 'Расклад на год', description: 'Подробный прогноз на весь год. Карты покажут ключевые события, возможности и вызовы в каждой сфере жизни.', price: 48000, time: '90 мин' },
  { icon: '🔗', title: 'Отношения', description: 'Глубокий анализ отношений с партнёром. Совместимость, кармические связи, перспективы и рекомендации.', price: 28000, time: '45 мин' }
]

// Particle Background Component
function Particles() {
  const particles = useRef([])
  
  useEffect(() => {
    particles.current = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2
    }))
  }, [])

  return (
    <div className="bg-particles">
      {particles.current.map(p => (
        <motion.div
          key={p.id}
          className="particle"
          style={{ left: `${p.left}%`, top: `${p.top}%` }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity
          }}
        />
      ))}
    </div>
  )
}

// Header Component
function Header({ scrolled, menuOpen, setMenuOpen }) {
  return (
    <motion.header 
      className={`header ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="nav">
        <a href="#" className="logo">Виви</a>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>Обо мне</a></li>
          <li><a href="#services" onClick={() => setMenuOpen(false)}>Услуги</a></li>
          <li><a href="#daily-card" onClick={() => setMenuOpen(false)}>Карта дня</a></li>
          <li><a href="#reviews" onClick={() => setMenuOpen(false)}>Отзывы</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Контакты</a></li>
        </ul>
        <a href="#booking" className="btn-book">Записаться</a>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </motion.header>
  )
}

// Hero Section
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Таролог
        </motion.p>
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Виви
          <span>Путь через карты</span>
        </motion.h1>
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          Откройте тайны своего будущего через древнее искусство Таро. 
          Индивидуальный подход и глубокое понимание каждой ситуации.
        </motion.p>
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <a href="#booking" className="btn btn-primary">Записаться на консультацию</a>
          <a href="#daily-card" className="btn btn-secondary">Карта дня</a>
        </motion.div>
      </div>
    </section>
  )
}

// About Section
function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Познакомьтесь</p>
          <h2 className="section-title">Обо мне</h2>
          <div className="section-divider"></div>
        </motion.div>
        <div className="about-content">
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-image-wrapper">
              <img src="/images/vivi-photo.jpg" alt="Виви" className="about-img" />
            </div>
          </motion.div>
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Мой путь в таро</h3>
            <p>
              Я занимаюсь таро более 10 лет. Мой путь начался с классической колоды Райдера-Уэйта, 
              но со временем я изучила множество традиций и систем. Каждая карта — это не просто 
              изображение, а живой символ, несущий глубокий смысл.
            </p>
            <p>
              В своей работе я использую интуитивный подход, сочетая традиционное толкование карт 
              с чувствованием энергии клиента. Таро — это не предсказание судьбы, а инструмент 
              для самопознания и понимания происходящего в вашей жизни.
            </p>
            <p>
              Я верю, что каждый человек способен найти ответы внутри себя. Карты помогают 
              увидеть ситуацию с другой стороны и принять правильное решение.
            </p>
            <p className="about-sign">— Виви</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function Services({ onBook }) {
  return (
    <section className="services" id="services">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Мои услуги</p>
          <h2 className="section-title">Бронирование</h2>
          <div className="section-divider"></div>
        </motion.div>
        <div className="services-grid" id="booking">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <p className="service-price">{service.price.toLocaleString()} ₸ <span>/ {service.time}</span></p>
              <button className="btn btn-secondary" onClick={() => onBook(service)}>
                Забронировать
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Daily Card Section
function DailyCard() {
  const [cardDrawn, setCardDrawn] = useState(false)
  const [currentCard, setCurrentCard] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)

  const drawCard = () => {
    if (!cardDrawn) {
      const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
      setCurrentCard(randomCard)
      setIsFlipped(true)
      setCardDrawn(true)
    } else {
      setIsFlipped(false)
      setTimeout(() => {
        const newRandomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)]
        setCurrentCard(newRandomCard)
        setTimeout(() => setIsFlipped(true), 300)
      }, 300)
    }
  }

  return (
    <section className="daily-card" id="daily-card">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Энергия дня</p>
          <h2 className="section-title">Карта дня</h2>
          <div className="section-divider"></div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', textAlign: 'center' }}>
            Вытяните карту и получите послание на сегодняшний день. 
            Пусть Старшие Арканы Таро направят ваш путь.
          </p>
          <div className="tarot-card-container">
            <motion.div 
              className={`tarot-card ${isFlipped ? 'flipped' : ''}`}
              onClick={drawCard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="tarot-card-face tarot-card-back"></div>
              <div className="tarot-card-face tarot-card-front">
                {currentCard ? (
                  <>
                    <span className="tarot-card-number">{currentCard.number}</span>
                    <h4 className="tarot-card-name">{currentCard.name}</h4>
                    <p className="tarot-card-meaning">{currentCard.meaning}</p>
                  </>
                ) : (
                  <p className="tarot-card-meaning">Нажмите, чтобы вытянуть карту</p>
                )}
              </div>
            </motion.div>
          </div>
          <motion.button 
            className="btn btn-primary btn-draw"
            onClick={drawCard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cardDrawn ? 'Вытянуть другую карту' : 'Вытянуть карту'}
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Reviews Section
function Reviews() {
  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="reviews" id="reviews">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Отзывы</p>
          <h2 className="section-title">Мнения клиентов</h2>
          <div className="section-divider"></div>
        </motion.div>
        <motion.div 
          className="reviews-slider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div 
            className="reviews-track" 
            style={{ transform: `translateX(-${currentReview * 100}%)` }}
          >
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-stars">★★★★★</div>
                <p className="review-text">{review.text}</p>
                <p className="review-author">{review.author}</p>
                <p className="review-date">{review.date}</p>
              </div>
            ))}
          </div>
          <div className="reviews-nav">
            {reviews.map((_, index) => (
              <span 
                key={index} 
                className={`review-dot ${index === currentReview ? 'active' : ''}`}
                onClick={() => setCurrentReview(index)}
              ></span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Contact Section
function Contact({ showModal, setShowModal }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal('success')
  }

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-subtitle">Связь</p>
          <h2 className="section-title">Контакты</h2>
          <div className="section-divider"></div>
        </motion.div>
        <div className="contact-content">
          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Ваше имя</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Услуга</label>
                <select>
                  <option value="">Выберите услугу</option>
                  <option value="Разбор ситуации">Разбор ситуации</option>
                  <option value="Глубокий расклад">Глубокий расклад</option>
                  <option value="Карта дня">Карта дня</option>
                  <option value="Мастер-класс">Мастер-класс</option>
                  <option value="Другое">Другое</option>
                </select>
              </div>
              <div className="form-group">
                <label>Сообщение</label>
                <textarea placeholder="Опишите вашу ситуацию или задайте вопрос..."></textarea>
              </div>
              <button type="submit" className="form-submit">Отправить</button>
            </form>
          </motion.div>
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="contact-item">
              <div className="contact-icon">✉</div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>violetta1010@icloud.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h4>Телефон</h4>
                <p>+7 705 121 6666</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">⏰</div>
              <div className="contact-details">
                <h4>Время работы</h4>
                <p>Ежедневно с 10:00 до 20:00</p>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Мессенджеры</h4>
              <div className="messengers">
                <a href="https://t.me/violetta_1010" className="messenger-btn telegram" target="_blank">
                  Telegram
                </a>
                <a href="https://wa.me/77051216666" className="messenger-btn whatsapp" target="_blank">
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">✦ Виви ✦</div>
      <p className="footer-text">Таролог | Карты Таро | Консультации</p>
      <div className="footer-social">
        <a href="https://t.me/violetta_1010" target="_blank">Telegram</a>
        <a href="https://instagram.com" target="_blank">Instagram</a>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>© 2026 Виви. Все права защищены.</p>
    </footer>
  )
}

// Modal Component
function Modal({ showModal, setShowModal, service }) {
  if (!showModal) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal('success')
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay active"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(null)}
      >
        <motion.div 
          className="modal"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={() => setShowModal(null)}>×</button>
          
          {showModal === 'success' ? (
            <div className="modal-success">
              <div className="modal-success-icon">✓</div>
              <h3 className="modal-title">Спасибо!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Ваша заявка принята. Мы свяжемся с вами в ближайшее время.</p>
              <button 
                className="btn btn-primary" 
                style={{ marginTop: '1.5rem', width: '100%' }}
                onClick={() => setShowModal(null)}
              >
                OK
              </button>
            </div>
          ) : (
            <>
              <h3 className="modal-title">Бронирование консультации</h3>
              <p style={{ color: 'var(--gold)', textAlign: 'center', marginBottom: '1rem' }}>
                {service?.title} — {service?.price.toLocaleString()} ₸
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Ваше имя</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Телефон</label>
                  <input type="tel" required />
                </div>
                <div className="form-group">
                  <label>Дата</label>
                  <input type="date" required />
                </div>
                <div className="form-group">
                  <label>Время</label>
                  <input type="time" required />
                </div>
                <button type="submit" className="form-submit">Забронировать</button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Main App
function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(null)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBook = (service) => {
    setSelectedService(service)
    setShowModal('booking')
  }

  return (
    <>
      <Particles />
      <div className="fog"></div>
      <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <About />
      <Services onBook={handleBook} />
      <DailyCard />
      <Reviews />
      <Contact showModal={showModal} setShowModal={setShowModal} />
      <Footer />
      <Modal 
        showModal={showModal} 
        setShowModal={setShowModal} 
        service={selectedService} 
      />
    </>
  )
}

export default App
