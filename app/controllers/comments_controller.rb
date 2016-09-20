class CommentsController < ApplicationController

  def create
    @comment = current_user.comments.build(comment_params)
    if @comment.save
      render json: @comment.as_json, status: 200
    else
      render json: t('.failure', scope: :flash) , status: 422
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:message, :commentable_id, :commentable_type)
    end
end
