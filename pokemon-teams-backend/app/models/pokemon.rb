class Pokemon < ApplicationRecord
  belongs_to :trainer
  validate do
     pokemon_count_valid?
  end
  private

  def pokemon_count_valid?
      if self.trainer.pokemons.count >= 6
          # custom error - this is how the error will be refferenced
          self.errors.add(:team_max, "Hey don't get greedy. The maxmum number of pokemons is 6!")
      end
  end
end
