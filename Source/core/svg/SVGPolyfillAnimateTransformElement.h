// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef SVGPolyfillAnimateTransformElement_h
#define SVGPolyfillAnimateTransformElement_h

#include "core/svg/SVGPolyfillAnimationElement.h"

namespace blink {

class SVGPolyfillAnimateTransformElement : public SVGPolyfillAnimationElement {
    DEFINE_WRAPPERTYPEINFO();
public:
    DECLARE_NODE_FACTORY(SVGPolyfillAnimateTransformElement);

private:
    explicit SVGPolyfillAnimateTransformElement(Document&);
};

} // namespace blink

#endif // SVGPolyfillAnimateTransformElement_h
