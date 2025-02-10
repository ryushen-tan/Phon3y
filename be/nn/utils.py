class PhonemeUtils:
    # 61 phonemes from TIMIT
    PHONEMES = [
        'aa', 'ae', 'ah', 'ao', 'aw', 'ax', 'ax-h', 'axr', 'ay', 'b', 'bcl', 'ch', 'd', 'dcl', 'dh', 'dx', 'eh', 'el', 'em',
        'en', 'eng', 'epi', 'er', 'ey', 'f', 'g', 'gcl', 'h#', 'hh', 'hv', 'ih', 'ix', 'iy', 'jh', 'k', 'kcl', 'l', 'm', 'n',
        'ng', 'nx', 'ow', 'oy', 'p', 'pau', 'pcl', 'q', 'r', 's', 'sh', 't', 'tcl', 'th', 'uh', 'uw', 'ux', 'v', 'w', 'y', 'z', 'zh'
    ]

    PHONEME_TO_INDEX = {phoneme: idx for idx, phoneme in enumerate(PHONEMES)}

    @classmethod
    def phoneme_label_to_index(cls, label):
        """
        Convert a phoneme label to its corresponding index.
        
        Args:
            label (str): The phoneme label.
            
        Returns:
            int: The index of the phoneme.
        """
        return cls.PHONEME_TO_INDEX.get(label, -1)
    
    
    @classmethod
    def phoneme_index_to_label(cls, index):
        """
        Convert a phoneme index to its corresponding label.
        
        Args:
            index (int): The phoneme index.
            
        Returns:
            str: The label of the phoneme.
        """
        return cls.PHONEMES[index] if 0 <= index < len(cls.PHONEMES) else None
    

    @staticmethod
    def get_phone_error_rate(predictions, targets):
        """
        Calculate the phone error rate (PER) between predictions and targets.
        
        Args:
            predictions (list of int): The predicted phoneme indices.
            targets (list of int): The ground truth phoneme indices.
            
        Returns:
            float: The phone error rate.
        """
        if len(predictions) != len(targets):
            raise ValueError("Length of predictions and targets must be the same.")
        
        errors = sum(p != t for p, t in zip(predictions, targets))
        return errors / len(targets)

if __name__ == "__main__":
    
    labels = ['aa', 'ae', 'ah', 'ao']
    indices = [PhonemeUtils.phoneme_label_to_index(label) for label in labels]
    print("Phoneme indices:", indices)
    
    predictions = [0, 1, 2, 3]
    targets = [0, 1, 2, 4]
    per = PhonemeUtils.get_phone_error_rate(predictions, targets)
    print("Phone Error Rate:", per)