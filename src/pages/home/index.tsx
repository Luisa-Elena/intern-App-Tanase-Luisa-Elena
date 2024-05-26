import React, { useState, useEffect } from 'react';
import styles from './home.module.scss';

type Card = {
  id: number;
  title: string;
  description: string;
};

const Home = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [newCard, setNewCard] = useState<Card>({ id: 0, title: '', description: '' });
  const [editCard, setEditCard] = useState<Card | null>(null);

  useEffect(() => {
    const storedCards = localStorage.getItem('cards');
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = () => {
    if(newCard.title !== '' && newCard.description !== '') {
      setCards([...cards, { ...newCard, id: Date.now() }]);
      setNewCard({ id: 0, title: '', description: '' });
    } else {
      alert('Please enter a title and a description for the new card.');
    }
  };

  const handleUpdateCard = (id: number) => {
    setCards(cards.map(card => (card.id === id ? editCard! : card)));
    setEditCard(null);
  };

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <div className={styles.homeDiv}>
      <div className={styles.cardForm}>
        <h2>Add a new card</h2>
        <input
          className={styles.cardInput}
          type="text"
          placeholder="Title"
          value={newCard.title}
          onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
        />
        <input
          className={styles.cardInput}
          type="text"
          placeholder="Description"
          value={newCard.description}
          onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
        />
        <button className={styles.cardButton} onClick={handleAddCard}>Add Card</button>
      </div>
      
      <h2>Existing Cards</h2>

      <div className={styles.existingCardsContainer}>
        {cards.map((card) => (
          <div key={card.id}>
            {editCard && editCard.id === card.id ? (
              <div className = {styles.cardForm}>
                <h2>Edit card</h2>
                <input
                  className={styles.cardInput}
                  type="text"
                  value={editCard.title}
                  onChange={(e) => setEditCard({ ...editCard, title: e.target.value })}
                />
                <input
                  className={styles.cardInput}
                  type="text"
                  value={editCard.description}
                  onChange={(e) => setEditCard({ ...editCard, description: e.target.value })}
                />
                <div className={styles.cardButtonsContainer}>
                  <button className={styles.cardButton} onClick={() => handleUpdateCard(card.id)}>Update</button>
                  <button className={styles.cardButton} onClick={() => setEditCard(null)}>Cancel</button>
                </div>
              </div >
            ) : (
              <div className={styles.card}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
                <div className={styles.cardButtonsContainer}>
                  <button className={styles.cardButton} onClick={() => setEditCard(card)}>Edit</button>
                  <button className={styles.cardButton} onClick={() => handleDeleteCard(card.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
