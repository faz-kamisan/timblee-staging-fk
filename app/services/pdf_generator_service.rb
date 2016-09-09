class PdfGeneratorService

  def initialize(file_path, binding)
    erb_file = File.read(file_path)
    template = ERB.new(erb_file)
    @kit = PDFKit.new(template.result(binding))
    @kit.stylesheets << "#{ Rails.root }/vendor/assets/stylesheets/bootstrap.css"
  end

  def generate_pdf
    @kit.to_pdf
  end
end
