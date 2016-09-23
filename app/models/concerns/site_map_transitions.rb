module SiteMapTransitions
    extend ActiveSupport::Concern

    included do
      STATES = ['on_hold', 'in_progress', 'review', 'approved']

      validates :state, inclusion: { in: STATES }

      scope :on_hold, -> { where(state: 'on_hold') }
      scope :in_progress, -> { where(state: 'in_progress') }
      scope :review, -> { where(state: 'review') }
      scope :approved, -> { where(state: 'approved') }

      private

        def set_default_state
          self.state = 'in_progress'
        end
    end

end
