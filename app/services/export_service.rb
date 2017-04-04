class ExportService
  WIDTH = { 'A2' => 2120.0, 'A3' => 1600.0, 'A4' => 1024.0 }
  MAX_PAGES = { 'A2' => 8, 'A3' => 5, 'A4' => 3 }

  TILE_WIDTH = 240
  ZOOM_PRECISION = 3

  def self.calculate_width(no_of_pages)
    200 + (TILE_WIDTH * no_of_pages)
  end

  def self.calculate_zoom(page_size, no_of_pages)
    return 1 if no_of_pages <= MAX_PAGES[page_size]

    page_size = WIDTH[page_size]
    actual_size = calculate_width(no_of_pages)

    (page_size / actual_size).round(ZOOM_PRECISION)
  end
end
