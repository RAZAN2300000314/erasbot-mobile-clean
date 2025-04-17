// services/feedbackService.ts
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

type Feedback = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const submitFeedback = async (feedback: Feedback) => {
  try {
    await addDoc(collection(db, 'feedbacks'), {
      ...feedback,
      timestamp: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return false;
  }
};
